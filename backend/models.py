from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Univ(db.Model):
    __tablename__ = "univ"
    univ_id = db.Column(db.Integer,primary_key = True, autoincrement = True)
    univ_name = db.Column(db.String)

class Admin(db.Model):
    __tablename__ = "admin"
    admin_id = db.Column(db.Integer,primary_key = True, autoincrement = True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String)
    univ_id = db.Column(db.Integer, db.ForeignKey('univ.univ_id'))
    
    university = db.relationship('Univ', backref='Admin', lazy=True)
    
class Stud(db.Model):
    __tablename__ = "stud"
    stud_id = db.Column(db.Integer,primary_key = True, autoincrement = True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String)
    dob = db.Column(db.Date)
    program = db.Column(db.String)
    start_date = db.Column(db.Date)
    ent_status = db.Column(db.String)
    univ_id = db.Column(db.Integer, db.ForeignKey('univ.univ_id'))
    
    university = db.relationship('Univ', backref='students', lazy=True)

    
class Certi(db.Model):
    __tablename__ = "certi"  # Correct this line
    certi_id = db.Column(db.Integer,primary_key = True, autoincrement = True)
    grade = db.Column(db.String)
    stud_id = db.Column(db.Integer,db.ForeignKey('stud.stud_id'))
    univ_id = db.Column(db.Integer,db.ForeignKey('univ.univ_id'))
    request_date = db.Column(db.Date)
    issued_date = db.Column(db.Date)
    program = db.Column(db.String)
    reason = db.Column(db.String)
    status = db.Column(db.String)
    
    
    student = db.relationship('Stud', backref='certi', lazy=True)
    university = db.relationship('Univ', backref='certi', lazy=True)