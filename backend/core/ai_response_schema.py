from rest_framework import serializers

class AIResponseSerializer(serializers.Serializer):
    schema_version = serializers.CharField(default="1.0")
    summary = serializers.CharField()
    key_points = serializers.ListField(child=serializers.CharField(), required=False)
    step_by_step = serializers.ListField(child=serializers.CharField(), required=False)
    legal_reference = serializers.ListField(child=serializers.CharField(), required=False)
    action_items = serializers.ListField(child=serializers.CharField(), required=False)
    confidence_score = serializers.FloatField(min_value=0.0, max_value=1.0)
    risk_level = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        # Optionally enforce required fields or custom logic
        return data
