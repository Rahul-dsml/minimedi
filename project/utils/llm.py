import os
from groq import Groq

# Initialize Groq client with API key
client = Groq(
    api_key=os.getenv("GROQ_API_KEY", "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")
)

def ask_LLM(input_text: str, system_message: str = "You are a helpful and friendly assistant.", context: str = None):
    """
    Queries the Groq Cloud LLM with a prompt and optional context.

    Args:
        input_text (str): The user input or prompt.
        system_message (str): Instructions for the model's behavior.
        context (str, optional): Conversation context for the model.

    Returns:
        str: The response from the LLM.
    """
    messages = [{'role': 'system', 'content': system_message}]

    if context:
        messages.append({'role': 'user', 'content': context})

    messages.append({'role': 'user', 'content': input_text})
    
    chat_completion = client.chat.completions.create(
        messages=messages,
        model=os.getenv("LLM_MODEL", "llama3-groq-70b-8192-tool-use-preview"),
        temperature=0.5,
    )

    response = chat_completion.choices[0].message.content
    return response
