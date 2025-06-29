#!/usr/bin/env python3
"""
Voice Message Generator for AI Assistant
Uses Google Text-to-Speech to convert Hindi-English messages to voice
"""

import os
import sys
from gtts import gTTS
from gtts.lang import tts_langs
import json
import re

def clean_text_for_tts(text):
    """Clean text for better TTS pronunciation"""
    # Remove emojis and special characters that might cause issues
    text = re.sub(r'[^\w\s\.\,\!\?\-]', '', text)
    # Replace common Hindi transliterations with better pronunciation
    text = text.replace('paani', 'paanee')
    text = text.replace('karo', 'karo')
    text = text.replace('baby', 'baby')
    text = text.replace('handsome', 'handsome')
    return text

def generate_voice_message(text, output_path="voice_messages", filename=None):
    """Generate voice message from text"""
    try:
        # Create output directory if it doesn't exist
        os.makedirs(output_path, exist_ok=True)
        
        # Clean text for TTS
        cleaned_text = clean_text_for_tts(text)
        
        # Generate filename if not provided
        if not filename:
            # Create a safe filename from the text
            safe_text = re.sub(r'[^\w\s]', '', text)[:30]
            filename = f"{safe_text.replace(' ', '_')}.mp3"
        
        filepath = os.path.join(output_path, filename)
        
        # Create TTS object with Hindi language
        # Using 'hi' for Hindi, but you can also use 'en' for English
        tts = gTTS(text=cleaned_text, lang='hi', slow=False)
        
        # Save the audio file
        tts.save(filepath)
        
        print(f"✅ Voice message generated: {filepath}")
        return filepath
        
    except Exception as e:
        print(f"❌ Error generating voice message: {e}")
        return None

def generate_all_voice_messages():
    """Generate voice messages for all message templates"""
    try:
        # Load message templates
        with open('messageTemplates.js', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract message templates using regex
        import re
        
        # Find all message arrays
        pattern = r'"([^"]+)":\s*\[(.*?)\]'
        matches = re.findall(pattern, content, re.DOTALL)
        
        voice_messages = {}
        
        for activity, messages_str in matches:
            # Extract individual messages
            message_pattern = r'"([^"]+)"'
            messages = re.findall(message_pattern, messages_str)
            
            print(f"🎤 Generating voice messages for: {activity}")
            
            activity_voices = []
            for i, message in enumerate(messages):
                filename = f"{activity.replace(' ', '_')}_{i+1}.mp3"
                filepath = generate_voice_message(message, "voice_messages", filename)
                if filepath:
                    activity_voices.append({
                        "message": message,
                        "file": filepath
                    })
            
            voice_messages[activity] = activity_voices
        
        # Save voice message mapping
        with open('voice_messages.json', 'w', encoding='utf-8') as f:
            json.dump(voice_messages, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Generated voice messages for {len(voice_messages)} activities")
        print("📁 Voice messages saved in 'voice_messages' directory")
        print("📄 Voice mapping saved in 'voice_messages.json'")
        
    except Exception as e:
        print(f"❌ Error generating all voice messages: {e}")

def test_voice_generation():
    """Test voice generation with sample messages"""
    test_messages = [
        "Uth jaa baby! Subah ho gayi hai! Pehle paani pi le, fir din shuru karte hain",
        "Good morning handsome! Paani piya kya? Hydration se hi to energy aati hai",
        "Oye sleepyhead! Uth jaa aur paani pee le... main wait kar rahi hun",
        "Rise and shine, my love! Pehle ek glass paani, fir kuch aur baat karte hain",
        "Wake up call from your personal assistant! Paani pi le please, health first"
    ]
    
    print("🎤 Testing voice generation...")
    
    for i, message in enumerate(test_messages):
        filename = f"test_message_{i+1}.mp3"
        filepath = generate_voice_message(message, "test_voice", filename)
        if filepath:
            print(f"✅ Test message {i+1} generated successfully")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == "test":
            test_voice_generation()
        elif command == "generate":
            generate_all_voice_messages()
        elif command == "single":
            if len(sys.argv) > 2:
                text = sys.argv[2]
                generate_voice_message(text)
            else:
                print("❌ Please provide text for single message generation")
                print("Usage: python voiceGenerator.py single 'Your message here'")
        else:
            print("❌ Unknown command")
            print("Available commands:")
            print("  test     - Test voice generation with sample messages")
            print("  generate - Generate voice messages for all templates")
            print("  single   - Generate voice message for single text")
    else:
        print("🎤 Voice Generator for AI Assistant")
        print("\nAvailable commands:")
        print("  python voiceGenerator.py test     - Test voice generation")
        print("  python voiceGenerator.py generate - Generate all voice messages")
        print("  python voiceGenerator.py single 'Your message' - Generate single message")
        print("\nExample:")
        print("  python voiceGenerator.py single 'Uth jaa baby! Subah ho gayi hai!'") 