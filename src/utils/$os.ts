import { resolve } from 'path';

export namespace $os {
    /** Resolves once the OS launcher accepts the target, not when the application closes. */
    export async function open(filePath: string): Promise<void> {
        const { spawn } = require('child_process') as typeof import('child_process');
        if (!filePath || /[\x00-\x1f\x7f]/.test(filePath)) {
            throw new Error('Invalid target to open');
        }
        let target = /^[a-z][a-z\d+.-]*:/i.test(filePath) ? filePath : resolve(filePath);
        let command: string;
        let args: string[];
        let env = { ...process.env };
        switch (process.platform) {
            case 'win32':
                command = 'powershell.exe';
                // The target is data in the environment, never interpolated into PowerShell code.
                env.OXWEB_OPEN_TARGET = target;
                args = ['-NoProfile', '-NonInteractive', '-Command',
                    "$ErrorActionPreference = 'Stop'; $info = New-Object System.Diagnostics.ProcessStartInfo; $info.FileName = $env:OXWEB_OPEN_TARGET; $info.UseShellExecute = $true; [System.Diagnostics.Process]::Start($info) | Out-Null"];
                break;
            case 'darwin':
                command = 'open';
                args = [target];
                break;
            default:
                command = 'xdg-open';
                args = [target];
                break;
        }
        await new Promise<void>((resolve, reject) => {
            let child = spawn(command, args, { shell: false, windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'], env });
            // Drain stderr without echoing targets that might contain credentials.
            child.stderr?.resume();
            child.once('error', reject);
            child.once('close', (code, signal) => {
                if (code === 0) resolve();
                else reject(new Error(`Could not open target: launcher exited with ${code ?? signal}`));
            });
        });
    }
}
