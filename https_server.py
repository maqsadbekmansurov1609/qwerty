import http.server
import ssl
import os

# cryptography modulini import qilish
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa
import datetime

# QGIS2Web papka
web_dir = os.path.dirname(__file__)
os.chdir(web_dir)

# Sertifikat fayli
cert_file = os.path.join(os.path.dirname(__file__), "server.pem")

# Agar server.pem mavjud bo'lmasa, yaratish
if not os.path.exists(cert_file):
    print("👉 server.pem yo‘q, yaratilyapti...")

    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    subject = issuer = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, u"UZ"),
        x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, u"Fargona"),
        x509.NameAttribute(NameOID.LOCALITY_NAME, u"Margilan"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, u"QGIS2WEB"),
        x509.NameAttribute(NameOID.COMMON_NAME, u"localhost"),
    ])
    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(key.public_key())
        .serial_number(x509.random_serial_number())
        .not_valid_before(datetime.datetime.utcnow())
        .not_valid_after(datetime.datetime.utcnow() + datetime.timedelta(days=365))
        .sign(key, hashes.SHA256())
    )

    with open(cert_file, "wb") as f:
        f.write(
            key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.TraditionalOpenSSL,
                encryption_algorithm=serialization.NoEncryption(),
            )
        )
        f.write(cert.public_bytes(serialization.Encoding.PEM))

    print("✅ server.pem yaratildi!")

# Server sozlamalari
server_address = ('0.0.0.0', 8443)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)

# SSLContext orqali HTTPS
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(certfile=cert_file)
httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

print("🚀 HTTPS server ishga tushdi!")
print("Kompyuterdan: https://localhost:8443")
print("Telefon/IP orqali: https://<SENING_IP>:8443")

httpd.serve_forever()
