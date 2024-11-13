
from app.Model.embeddingModel import tokenize


def transform_data(data, ASIN_NO):
    try:
        if not isinstance(data, dict):
            raise ValueError("Input data is not a dictionary")
        formated_data = {
            "product_asin_no": ASIN_NO,
            "average_rating": data["rating"],
            "reviews": []
        }
        for review in data["customer_reviews"]:
            
            date_str = review["date"]
        
            review_date = " ".join(date_str.split(" ")[-3:])
            review_embeddings = tokenize(review["review"])
            title_embeddings = tokenize(review["title"])            

            formated_data["reviews"].append({
                "title": title_embeddings,
                "review": review_embeddings,  
                "star": review["rating"],
                "date": review_date
            })
    
        return formated_data
    except Exception as e:
        print(f"Exception occurred while transforming data: {e}")
        return {"success": "false", "error": str(e)}
