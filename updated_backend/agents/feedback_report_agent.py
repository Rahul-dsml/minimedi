from utility.llm import ask_LLM

# You can define the core dispatcher skills here, at the top level:
core_dispatcher_skills = [
    "Situation Assessment & Triage",
    "Location Confirmation",
    "Communication Skills",
    "Protocol Adherence & Checklist Usage",
    "Time Management & Prioritization",
    "Emotional Intelligence & Caller Management",
    "Technical Proficiency",
    "Adaptive Thinking & Scenario Flexibility",
    "Stress Management",
    "Continuous Feedback & Improvement"
]

class FeedbackReportGenerator:
    def __init__(self, name="FeedbackReportGenerator"):
        self.name = name

    def generate_feedback(self, conversation_logs):
        """
        Generate a feedback report based on conversation logs.

        Args:
            conversation_logs (list): List of messages exchanged during the conversation.

        Returns:
            dict: Contains the feedback report summary and detailed analysis.
        """
        print("\nDEBUG: Conversation Logs Passed to Feedback Generator:\n", conversation_logs)
        
        # Format logs into a readable format for the LLM
        formatted_logs = "\n".join(
            [f"{msg['role'].capitalize()}: {msg['content']}" for msg in conversation_logs]
        )

        # Build a string that includes the core dispatcher skills
        skills_text = "\n".join([f"- {skill}" for skill in core_dispatcher_skills])

        input_text = (
            "Analyze the following 911 dispatcher conversation logs:\n\n"
            f"{formatted_logs}\n\n"
            "You are an expert trainer and must provide a rigorous feedback report, focusing on:\n"
            f"{skills_text}\n\n"
            "The output must be only in JSON Format with following keys:\n"
            "'Situation_Assessment_&_Triage_score': 'score out of 10'"
            "'Protocol_Adherence_Checklist_Usage_score': 'score out of 10'"
            "'Emotional_Intelligence_&_Caller_Management_score': 'score out of 10'"
            "'Adaptive_Thinking_&_Scenario_Flexibility_score': 'score out of 10'"
            "'Communication_Skills_score': 'score out of 10'"
            "'Positive_aspects': 'positive aspects of how the dispatcher handled the call.'"
            "'Negative_aspects': 'negative aspects of how the dispatcher handled the call'"
            "'Feedback': 'constructive feedback for improvement'"
            "'Overall_rating': 'overall rating of how the dispatcher handled the call'"
            "\n"
            "The output MUST BE WITHIN CURLY BRACKETS FOLLOWING JSON FORMAT."
          
        )

        system_message = "You are an expert trainer analyzing 911 dispatcher conversations."

        # Generate feedback report using the LLM
        try:
            feedback_report = ask_LLM(input_text=input_text, system_message=system_message)
            return {"feedback_report": feedback_report}
        except Exception as e:
            print(f"Error in FeedbackReportGenerator: {e}")
            return {"feedback_report": "An error occurred while generating feedback."}
