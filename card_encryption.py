# card_encryption.py

from cryptography.fernet import Fernet
import base64
import os

class CardEncryption:
    def __init__(self):
        # Генерация ключа шифрования
        if not os.path.exists('encryption.key'):
            key = Fernet.generate_key()
            with open('encryption.key', 'wb') as key_file:
                key_file.write(key)
        else:
            with open('encryption.key', 'rb') as key_file:
                key = key_file.read()

        self.cipher_suite = Fernet(key)

    def encrypt_card_data(self, card_data):
        """Шифрование данных карты"""
        encrypted_data = self.cipher_suite.encrypt(card_data.encode())
        return base64.urlsafe_b64encode(encrypted_data).decode()

    def decrypt_card_data(self, encrypted_data):
        """Расшифровка данных карты"""
        try:
            decrypted_data = self.cipher_suite.decrypt(base64.urlsafe_b64decode(encrypted_data))
            return decrypted_data.decode()
        except:
            return None