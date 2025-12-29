import os
import json
import logging
from datetime import datetime

import google.generativeai as genai
from django.conf import settings
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)

class AIAnswerView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        prompt = request.data.get('prompt')
        location = request.data.get('location', 'Nepal')

        if not prompt:
            return Response({'error': 'Prompt required.'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. API Key Setup
        GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
        if not GEMINI_API_KEY:
            return Response({'error': 'API key not configured.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        genai.configure(api_key=GEMINI_API_KEY)
        full_prompt = f"Location: {location}. User Question: {prompt}"

        # 2. Latest 2025 Model List
        # Priority: 
        # - gemini-3-flash-preview: Latest frontier performance
        # - gemini-2.5-flash: Current stable workhorse
        # - gemini-2.0-flash: Fallback stable
        models_to_try = [
            'gemini-3-flash-preview', 
            'gemini-2.5-flash', 
            'gemini-2.0-flash'
        ]
        
        answer = "I'm sorry, the AI service is currently unavailable. Please try again later."
        
        for model_name in models_to_try:
            try:
                model = genai.GenerativeModel(model_name)
                response = model.generate_content(full_prompt)
                
                if response and hasattr(response, 'text'):
                    answer = response.text.strip()
                    # Clean up formatting for consistent UI display
                    answer = '\n'.join(line.strip() for line in answer.splitlines() if line.strip())
                    break  # SUCCESS: Exit the loop
            except Exception as e:
                logger.warning(f"Model {model_name} failed: {str(e)}")
                # We continue to the next model in the list
                continue

        # 3. Data Logging
        try:
            self.log_interaction(prompt, location, answer)
        except Exception as log_err:
            logger.error(f"Logging failed: {log_err}")

        # IMPORTANT: This must be outside the loop to ensure a Response is always returned
        return Response({'answer': answer}, status=status.HTTP_200_OK)

    def log_interaction(self, prompt, location, answer):
        data_dir = os.path.join(os.path.dirname(__file__), 'data')
        os.makedirs(data_dir, exist_ok=True)
        record = {
            'timestamp': datetime.utcnow().isoformat(),
            'prompt': prompt,
            'location': location,
            'answer': answer
        }
        with open(os.path.join(data_dir, 'answers.jsonl'), 'a', encoding='utf-8') as f:
            f.write(json.dumps(record, ensure_ascii=False) + '\n')