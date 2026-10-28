import sys
import paramiko

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    ssh.connect('2.25.105.214', username='root', password='H#mOrE0KpO/U&SJF', timeout=15)
    cmd = 'docker logs --tail 40 puxartelefone-app'
    stdin, stdout, stderr = ssh.exec_command(cmd)
    print("Logs do container:")
    print(stdout.read().decode('utf-8', errors='replace'))
    print(stderr.read().decode('utf-8', errors='replace'))
finally:
    ssh.close()
