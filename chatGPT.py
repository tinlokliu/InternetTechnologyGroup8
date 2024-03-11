from openai import OpenAI    
client = OpenAI()


def ask_openai(question):

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are ChefBot, an AI knowledgeable about cooking, recipes, and culinary advice."},
        {"role": "user", "content": question},
    ]
    )

    # print(completion.choices[0].message)
    return str(completion.choices[0].message.content)

print(ask_openai("what is 1+1"))