from llama_index.llms.ollama import Ollama
def load_model():
    global llm
    llm = Ollama(model="llama3.2", request_timeout=60.0)

def answer_query(query, context=""):
    prompt_template = f"""### system
    Using the information contained in the context, answer the user query.
    response should be concise and relevant.
    If the answer cannot be deduced from the context, do not give an answer

    ### context
    {context}

    ### user query
    {query}

    ### assistant answer"""
    print(prompt_template)
    response = llm.complete(prompt_template)

    return response

def summarise_text(reviews, product_name=""):
    
    prompt_template = f"""### system
Using the information contained in the context, Give a summary of the context.
response should be concise and relevant.
start the response with customer says: and then the summary

### context
{reviews}

### assistant answer"""
    response = llm.complete(prompt_template)
    return response