import sys
import paramiko

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
try:
    ssh.connect('2.25.105.214', username='root', password='H#mOrE0KpO/U&SJF', timeout=15)
    
    cmd = 'ls -la /var/www/puxartelefone.com'
    stdin, stdout, stderr = ssh.exec_command(cmd)
    print("Files in /var/www/puxartelefone.com:")
    print(stdout.read().decode('utf-8', errors='replace'))

    cmd2 = 'cd /var/www/puxartelefone.com && git status'
    stdin, stdout, stderr = ssh.exec_command(cmd2)
    print("Git status on VPS:")
    print(stdout.read().decode('utf-8', errors='replace'))

finally:
    ssh.close()
