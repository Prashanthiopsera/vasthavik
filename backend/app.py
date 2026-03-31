from flask import Flask, request, jsonify, session
from flask_cors import CORS
from models import db, Admin, Stud, Certi
from sqlalchemy.orm import class_mapper
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from functools import wraps
import secrets
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


app = Flask(__name__)

secret_key = os.environ.get('SECRET_KEY')
if not secret_key:
    raise RuntimeError('SECRET_KEY environment variable is required')
app.secret_key = secret_key

allowed_origins = os.environ.get('ALLOWED_ORIGINS', 'http://localhost:3000').split(',')
CORS(app, supports_credentials=True, origins=allowed_origins)

app.permanent_session_lifetime = timedelta(days=1)
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = os.environ.get('FLASK_ENV', 'production') != 'development'

database_url = os.environ.get('DATABASE_URL')
if not database_url:
    raise RuntimeError('DATABASE_URL environment variable is required')
app.config['SQLALCHEMY_DATABASE_URI'] = database_url

db.init_app(app)


def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required'}), 401
        return f(*args, **kwargs)
    return decorated


def require_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session or session.get('role') != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated


def model_to_dict(obj):
    fields = [c.key for c in class_mapper(obj.__class__).columns]
    return {field: getattr(obj, field) for field in fields}


def safe_model_to_dict(obj):
    """model_to_dict that always strips the password field."""
    data = model_to_dict(obj)
    data.pop('password', None)
    return data


@app.route("/")
def hello_world():
    return "<p>hello world</p>"


@app.route("/post_univ", methods=["POST"])
def postUniv():
    if not request.is_json:
        return jsonify({"error": "JSON required"}), 400
    username = request.json.get('username', '').strip()
    password = request.json.get('password', '')
    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400

    admin = Admin.query.filter_by(username=username).first()
    if admin and check_password_hash(admin.password, password):
        session.permanent = True
        session['user_id'] = admin.admin_id
        session['role'] = 'admin'
        return jsonify(safe_model_to_dict(admin)), 200

    return jsonify({"error": "Invalid username or password."}), 401


@app.route("/post_stud", methods=["POST"])
def postStud():
    if not request.is_json:
        return jsonify({"error": "JSON required"}), 400
    username = request.json.get('username', '').strip()
    password = request.json.get('password', '')
    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400

    student = Stud.query.filter_by(username=username).first()
    if student and check_password_hash(student.password, password):
        session.permanent = True
        session['user_id'] = student.stud_id
        session['role'] = 'student'
        return jsonify(safe_model_to_dict(student)), 200

    return jsonify({"error": "Invalid username or password."}), 401


@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully."}), 200


@app.route('/post_addstud', methods=['POST'])
@require_admin
def post_addstud():
    if not request.is_json:
        return jsonify({"error": "JSON required"}), 400
    data = request.json
    first_name = data.get("firstName", '').strip()
    last_name = data.get("lastName", '').strip()
    email = data.get("email", '').strip()
    dob = data.get("dob")
    program = data.get("program")
    start_date = data.get("startDate")
    ent_status = data.get("entStatus")
    univ_id = data.get("univ_id")

    if not first_name or not last_name or not email:
        return jsonify({"error": "firstName, lastName, and email are required."}), 400

    username = f"{first_name}{last_name}"

    # Generate a cryptographically secure random password
    plain_password = secrets.token_urlsafe(16)
    hashed_password = generate_password_hash(plain_password)

    existing_student = Stud.query.filter(
        (Stud.username == username) | (Stud.email == email)
    ).first()

    if existing_student:
        existing_student.first_name = first_name
        existing_student.last_name = last_name
        existing_student.password = hashed_password
        existing_student.dob = datetime.strptime(dob, '%Y-%m-%d') if dob else None
        existing_student.program = program
        existing_student.start_date = datetime.strptime(start_date, '%Y-%m-%d') if start_date else None
        existing_student.ent_status = ent_status
        existing_student.univ_id = univ_id
        db.session.commit()
        return jsonify({
            "message": "Student record updated successfully.",
            "username": username,
            "temporary_password": plain_password
        }), 200
    else:
        new_student = Stud(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=hashed_password,
            email=email,
            dob=datetime.strptime(dob, '%Y-%m-%d') if dob else None,
            program=program,
            start_date=datetime.strptime(start_date, '%Y-%m-%d') if start_date else None,
            ent_status=ent_status,
            univ_id=univ_id
        )
        db.session.add(new_student)
        db.session.commit()
        return jsonify({
            "message": "New student record created successfully.",
            "username": username,
            "temporary_password": plain_password
        }), 201


@app.route('/student_all', methods=['GET'])
@require_admin
def get_all_students():
    students = Stud.query.all()
    student_list = [
        {
            "stud_id": student.stud_id,
            "firstName": student.first_name,
            "lastName": student.last_name,
            "username": student.username,
            "email": student.email,
            "dob": student.dob.strftime('%Y-%m-%d') if student.dob else None,
            "program": student.program,
            "startDate": student.start_date.strftime('%Y-%m-%d') if student.start_date else None,
            "entStatus": student.ent_status,
            "univ_id": student.univ_id
        }
        for student in students
    ]
    return jsonify(student_list), 200


@app.route('/get_allcerti', methods=['GET'])
@require_admin
def get_allcerti():
    try:
        certificates = Certi.query.filter_by(status='Pending').all()
        certi_list = [
            {
                "certi_id": certificate.certi_id,
                "grade": certificate.grade,
                "stud_id": certificate.stud_id,
                "univ_id": certificate.univ_id,
                "request_date": certificate.request_date.strftime('%Y-%m-%d') if certificate.request_date else None,
                "issued_date": certificate.issued_date.strftime('%Y-%m-%d') if certificate.issued_date else None,
                "program": certificate.program,
                "reason": certificate.reason,
                "status": certificate.status
            }
            for certificate in certificates
        ]
        return jsonify(certi_list), 200
    except Exception as e:
        logger.error("Error in get_allcerti: %s", e)
        return jsonify({"error": "An internal error occurred. Please try again."}), 500


@app.route('/request_certificate', methods=['POST'])
@require_auth
def request_certificate():
    if not request.is_json:
        return jsonify({"error": "JSON required"}), 400
    data = request.json
    stud_id = session.get('user_id')  # Always derive from session — never trust client
    univ_id = data.get("univ_id")
    program = data.get("program")
    reason = data.get("reason")
    status = "Pending"

    request_date = datetime.now().date()

    existing_certificate = Certi.query.filter_by(stud_id=stud_id, request_date=request_date).first()

    if existing_certificate:
        existing_certificate.grade = ""
        existing_certificate.univ_id = univ_id
        existing_certificate.issued_date = None
        existing_certificate.program = program
        existing_certificate.reason = reason
        existing_certificate.status = status
        db.session.commit()
        return jsonify({"message": "Certificate record updated successfully."}), 200
    else:
        new_certificate = Certi(
            grade="",
            stud_id=stud_id,
            univ_id=univ_id,
            request_date=request_date,
            issued_date=None,
            program=program,
            reason=reason,
            status=status
        )
        db.session.add(new_certificate)
        db.session.commit()
        return jsonify({
            "message": "New certificate record created successfully.",
            "cert_id": new_certificate.certi_id
        }), 201


@app.route('/update_certi/<int:certificate_id>', methods=['PUT'])
@require_admin
def update_certi(certificate_id):
    if not request.is_json:
        return jsonify({"error": "JSON required"}), 400
    data = request.json
    grade = data.get('grade')
    status = data.get('status')

    certificate = Certi.query.get(certificate_id)
    if not certificate:
        return jsonify({'message': 'Certificate not found'}), 404

    if grade:
        certificate.grade = grade
    if status:
        certificate.status = status

    try:
        db.session.commit()
        return jsonify({'message': 'Certificate updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        logger.error("Error in update_certi: %s", e)
        return jsonify({'message': 'Error updating certificate. Please try again.'}), 500


@app.route('/issue_certificate', methods=['POST'])
@require_admin
def issue_certificate():
    if not request.is_json:
        return jsonify({"error": "JSON required"}), 400
    data = request.json
    grade = data.get('grade')
    stud_id = data.get('stud_id')

    if not grade or not stud_id:
        return jsonify({"error": "grade and stud_id are required."}), 400

    new_certificate = Certi(
        grade=grade,
        stud_id=stud_id,
        univ_id=None,
        request_date=None,
        issued_date=datetime.now().date(),
        program=None,
        reason=None,
        status='Issued'
    )
    try:
        db.session.add(new_certificate)
        db.session.commit()
        return jsonify({
            'message': 'Certificate issued successfully',
            'certi_id': new_certificate.certi_id
        }), 201
    except Exception as e:
        db.session.rollback()
        logger.error("Error in issue_certificate: %s", e)
        return jsonify({'message': 'Error issuing certificate. Please try again.'}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
