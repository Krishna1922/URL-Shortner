from sqlalchemy import Boolean, column, Integer, String, Column, BigInteger

from database import Base

class MappingTable(Base):
    __tablename__ = "mappingtable"

    id = Column(Integer, primary_key=True, autoincrement=True)
    longID = Column(String(64))
    LongUrl = Column(String(255))
    ShortUrl = Column(String(255))




