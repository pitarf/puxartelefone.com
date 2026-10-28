import sys
import paramiko
import time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

print("Iniciando deploy na VPS...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect('2.25.105.214', username='root', password='H#mOrE0KpO/U&SJF', timeout=20)
    print("Conectado via SSH na VPS (2.25.105.214).")

    def run_cmd(command):
        print(f"\n> {command}")
        stdin, stdout, stderr = ssh.exec_command(command)
        while not stdout.channel.exit_status_ready():
            if stdout.channel.recv_ready():
                data = stdout.channel.recv(1024).decode('utf-8', errors='replace')
                sys.stdout.write(data)
                sys.stdout.flush()
            time.sleep(0.1)
        # pegar o resto da saída
        data = stdout.read().decode('utf-8', errors='replace')
        sys.stdout.write(data)
        err = stderr.read().decode('utf-8', errors='replace')
        if err:
            sys.stderr.write(err)
        exit_code = stdout.channel.recv_exit_status()
        print(f"\n[Exit code: {exit_code}]")
        return exit_code

    # 1. Git pull
    run_cmd('cd /var/www/puxartelefone.com && git pull origin main')

    # 2. Rebuild e reinício do container docker
    print("\nReconstruindo container puxartelefone-app...")
    run_cmd('cd /var/www/puxartelefone.com && docker compose build --no-cache app && docker compose up -d app')

    # 3. Status dos containers
    run_cmd('docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"')

    print("\nDeploy na VPS concluído com sucesso!")

finally:
    ssh.close()
