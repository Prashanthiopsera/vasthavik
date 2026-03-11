from flask import Flask, request, jsonify, session
from flask_cors import CORS
from models import db,Admin,Stud,Certi
from sqlalchemy.orm import class_mapper
from datetime import datetime
import pytz
from datetime import timedelta, datetime
import os


app = Flask (__name__)
app.secret_key = 'vasthavik'
CORS(app,supports_credentials=True)
app.permanent_session_lifetime = timedelta(days=1)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://postgres:pgadmin@localhost:5432/vastavik')

# app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:pgadmin@localhost:5432/vastavik'
db.init_app(app)

@app.route("/")
def hello_world():
    return "<p> hello world</p>"

# def model_to_dict(obj):
#     fields = [c.key for c in class_mapper(obj.__class__).columns]
#     return {field: getattr(obj, field) for field in fields}
def model_to_dict(obj):
    # This converts a single SQLAlchemy object to a dictionary
    fields = [c.key for c in class_mapper(obj.__class__).columns]
    return {field: getattr(obj, field) for field in fields}


@app.route("/post_univ",methods = ["POST"])
def postUniv():
    username=request.json["username"]
    password=request.json["password"]
    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400
    admin = Admin.query.filter_by(username=username, password=password).first()
    #session['univ_id'] = admin.univ_id
    #print("University ID stored in session:", session['univ_id'])

    if admin: #check if pwd and username belongs to same person
        return jsonify(model_to_dict(admin)), 200
    else:
            return jsonify({"error": "Invalid username or password."}), 401
    # admins = Admin.query.all()
    # return jsonify(admins), 200
        
@app.route("/post_stud",methods = ["POST"])
def postStud():
    username=request.json["username"]
    password=request.json["password"]
    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400
    student = Stud.query.filter_by(username=username, password=password).first()

    if student:
            return jsonify(model_to_dict(student)), 200
    else:
            return jsonify({"error": "Invalid username or password."}), 401
        
@app.route('/post_addstud', methods=['POST'])
def post_addstud():
    data = request.json
    # Extract data from request 
    first_name = data.get("firstName")
    last_name = data.get("lastName")
    username = f"{data.get('firstName')}{data.get('lastName')}"
    email = data.get("email")
    dob = data.get("dob")
    year_of_birth = dob.split('-')[0]
    password = f"{first_name}{last_name}{year_of_birth}"
    program = data.get("program")
    start_date = data.get("startDate")
    ent_status = data.get("entStatus")
    univ_id = data.get("univ_id")
    print(univ_id)
    # Check if the student already exists by username or email
    existing_student = Stud.query.filter((Stud.username == username) | (Stud.email == email)).first()

    if existing_student:
        # If student exists, update their record
        existing_student.first_name = first_name
        existing_student.last_name = last_name
        existing_student.password = password
        existing_student.dob = datetime.strptime(dob, '%Y-%m-%d') if dob else None
        existing_student.program = program
        existing_student.start_date = datetime.strptime(start_date, '%Y-%m-%d') if start_date else None
        existing_student.ent_status = ent_status
        existing_student.univ_id = univ_id
        db.session.commit()
        return jsonify({"message": "Student record updated successfully."}), 200
    else:
        # Create new student record
        new_student = Stud(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            email=email,
            dob=datetime.strptime(dob, '%Y-%m-%d') if dob else None,
            program=program,
            start_date=datetime.strptime(start_date, '%Y-%m-%d') if start_date else None,
            ent_status=ent_status,
            univ_id = univ_id
        )
        db.session.add(new_student)
        db.session.commit()
        return jsonify({"message": "New student record created successfully.", "username": username}), 201   

@app.route('/student_all', methods=['GET'])
def get_all_students():
    students = Stud.query.all()
    student_list = [
        {
            "stud_id": student.stud_id,
            "firstName": student.first_name,
            "lastName": student.last_name,
            "username": student.username,
            "password": student.password,
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
def get_allcerti():
    try:
        # Query to get only certificates with 'pending' status
        certificates = Certi.query.filter_by(status='Pending').all()
        certi_list = []
        
        for certificate in certificates:
            print(certificate.__dict__)  # Log each certificate's dictionary
            
            certi_list.append({
                "certi_id": certificate.certi_id,
                "grade": certificate.grade,
                "stud_id": certificate.stud_id,
                "univ_id": certificate.univ_id,
                "request_date": certificate.request_date.strftime('%Y-%m-%d') if certificate.request_date else None,
                "issued_date": certificate.issued_date.strftime('%Y-%m-%d') if certificate.issued_date else None,
                "program": certificate.program,
                "reason": certificate.reason,
                "status": certificate.status
            })
        
        return jsonify(certi_list), 200
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500



@app.route('/request_certificate', methods=['POST'])
def request_certificate():
    data = request.json
    # Extract data from request
    stud_id = data.get("stud_id")
    univ_id = data.get("univ_id")
    program = data.get("program")
    reason = data.get("reason")
    status = "Pending"
    
    # Set request_date to the current date only (without time)
    request_date = datetime.now().date()  # Automatically sets to current date without time

    # Check if a certificate request already exists based on stud_id and request_date
    existing_certificate = Certi.query.filter_by(stud_id=stud_id, request_date=request_date).first()


    if existing_certificate:
        # If certificate exists, update the record
        existing_certificate.grade = ""  # Keep grade empty
        existing_certificate.univ_id = univ_id
        existing_certificate.issued_date = None
        existing_certificate.program = program  # Update program from the student record
        existing_certificate.reason = reason
        existing_certificate.status = status
        db.session.commit()
        return jsonify({"message": "Certificate record updated successfully."}), 200
    else:
        # Create a new certificate record
        new_certificate = Certi(
            grade="",  # Set grade to an empty string
            stud_id=stud_id,
            univ_id=univ_id,
            request_date=request_date,  # Use current date for request_date
            issued_date = None,
            program=program,  # Set program from the student record
            reason=reason,
            status=status
        )
        db.session.add(new_certificate)
        db.session.commit()
        return jsonify({"message": "New certificate record created successfully.", "cert_id": new_certificate.certi_id}), 201

@app.route('/update_certi/<int:certificate_id>', methods=['PUT'])
def update_certi (certificate_id):
    data = request.json
    grade = data.get('grade')
    status = data.get('status')

    # Find the certificate by ID
    certificate = Certi.query.get(certificate_id)
    if not certificate:
        return jsonify({'message': 'Certificate not found'}), 404

    # Update fields
    if grade:
        certificate.grade = grade
    if status:
        certificate.status = status

    try:
        db.session.commit()  # Commit changes to the database
        return jsonify({'message': 'Certificate updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating certificate', 'error': str(e)}), 500

        
@app.route('/issue_certificate',methods = ['POST'])
def issue_certificate():
    data = request.json
    grade = data.get('grade')
    stud_id = data.get('stud_id')
    new_certificate = Certi(
        grade=grade,
        stud_id=stud_id,
        # Assume you have logic to determine univ_id, reason, etc.
        univ_id=None,  # Set this as needed
        request_date = None,
        issued_date=datetime.now().date() ,  # Set this as needed (probably null for a new request)
        program=None,
        reason=None,  # Set this as needed
        status='Issued'  # Default status as 'pending'
    )
    try:
        # Add the new certificate to the session and commit
        db.session.add(new_certificate)
        db.session.commit()
        return jsonify({'message': 'Certificate issued successfully', 'certi_id': new_certificate.certi_id}), 201
    except Exception as e:
        db.session.rollback()  # Roll back the session on error
        return jsonify({'message': 'Error issuing certificate', 'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
