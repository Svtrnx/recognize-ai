import easyocr
from fastapi import HTTPException

def text_recognition(file_path):
    try:
        reader = easyocr.Reader(["ru","rs_cyrillic","be","bg","uk","mn","en"])
        result = reader.readtext(file_path, detail=0, paragraph=True)
        
        return result
    except Exception as e:
    	raise HTTPException(status_code=405, detail="Error, please try again!")
        
    
    
def main_ai(file_path):
    try:
        result = text_recognition(file_path=file_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=405, detail="Error, please try again!")
    








