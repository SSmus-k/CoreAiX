
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
import os
from .ai.trainer import AIModelTrainer

class CompanyInfoUploadView(APIView):
	permission_classes = [IsAuthenticated]
	parser_classes = [MultiPartParser, FormParser]

	def post(self, request):
		name = request.data.get('name')
		ctype = request.data.get('type')
		file = request.FILES.get('file')
		if not name or not ctype:
			return Response({'error': 'Name and type required'}, status=400)
		file_path = None
		upload_dir = os.path.join(settings.MEDIA_ROOT, 'company_files')
		os.makedirs(upload_dir, exist_ok=True)
		if file:
			file_path = os.path.join(upload_dir, file.name)
			with open(file_path, 'wb+') as dest:
				for chunk in file.chunks():
					dest.write(chunk)
		trainer = AIModelTrainer(data_dir=upload_dir)
		trainer.add_training_data(name, ctype, file_path)
		return Response({'message': 'Company info uploaded and added for training.'})
