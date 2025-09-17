
curl --location --request POST 'https://api.jogg.ai/v1/create_video_from_talking_avatar' \
--header 'x-api-key: <your-api-key>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "script": "Hi, welcome to JoggAI and create longer videos with Talking Avatars in minutes!",
    "aspect_ratio": 0,
    "screen_style": 1,
    "avatar_id": 127,
    "avatar_type": 0,
    "voice_id": "en-US-ChristopherNeural",
    "caption": true   
}'



{
    "rid": "d43b3a5999e31b7e7a62ee5ef84d411d",
    "code": 0,
    "msg": "success",
    "data": {
        "project_id": "<project-id>"  
    }
}


curl --location --request GET 'https://api.jogg.ai/v1/project?project_id=fa6228c0f52c4f3986e88f7ffa5d2864' \
--header 'x-api-key: <your-api-key>' \