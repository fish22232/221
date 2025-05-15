# ssl_config.py

import ssl
import OpenSSL
from datetime import datetime, timedelta


def create_self_signed_cert():
    # Генерация приватного ключа
    private_key = OpenSSL.crypto.PKey()
    private_key.generate_key(OpenSSL.crypto.TYPE_RSA, 2048)

    # Создание самоподписанного сертификата
    cert = OpenSSL.crypto.X509()
    cert.get_subject().CN = "localhost"
    cert.set_serial_number(1000)
    cert.gmtime_adj_notBefore(0)
    cert.gmtime_adj_notAfter(365 * 24 * 60 * 60)  # Действителен 1 год
    cert.set_issuer(cert.get_subject())
    cert.set_pubkey(private_key)
    cert.sign(private_key, 'sha256')

    # Сохранение сертификата и ключа
    with open("server.crt", "wb") as f:
        f.write(OpenSSL.crypto.dump_certificate(OpenSSL.crypto.FILETYPE_PEM, cert))
    with open("server.key", "wb") as f:
        f.write(OpenSSL.crypto.dump_privatekey(OpenSSL.crypto.FILETYPE_PEM, private_key))


def get_ssl_context():
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain('server.crt', 'server.key')
    return context