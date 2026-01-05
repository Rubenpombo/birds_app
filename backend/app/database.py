from sqlalchemy import create_engine, Column, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import datetime
import os

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(String, primary_key=True) # UUID
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    results = relationship("SharedResult", back_populates="user")

class SharedResult(Base):
    __tablename__ = 'shared_results'
    
    id = Column(String, primary_key=True) # UUID
    user_id = Column(String, ForeignKey('users.id'), nullable=True) # Optional for now
    image_filename = Column(String, nullable=False)
    metadata_json = Column(Text, nullable=False) # JSON string of detections
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="results")

# Database setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Default to SQLite
DEFAULT_DB_URL = f"sqlite:///{os.path.join(BASE_DIR, '..', 'iberbirds.db')}"

# Read from env, handle postgres naming if needed (Render/Supabase use postgres:// sometimes)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_DB_URL)
if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

connect_args = {"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args=connect_args
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
