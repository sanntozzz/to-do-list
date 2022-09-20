import * as Si from 'react-icons/si'

export function Footer() {
    return (
        <div className="space-y-2 text-center text-neutral-400 dark:text-neutral-500">
            <div className="text-sm">Developed by João F.C. Santos</div>
            <div className="flex items-center justify-center gap-2 text-lg">
                <a
                    href="https://www.linkedin.com/in/sanntozzz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="defaultLinks"
                >
                    <Si.SiLinkedin />
                </a>
                <a
                    href="https://github.com/sanntozzz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="defaultLinks"
                >
                    <Si.SiGithub />
                </a>
            </div>
        </div>
    )
}
