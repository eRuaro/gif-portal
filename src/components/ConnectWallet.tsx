import { MouseEventHandler } from "react"

interface ConnectWallerProps {
    onClick: MouseEventHandler
}

export const ConnectWallet: React.FC<ConnectWallerProps> = ({ onClick }) => {

    return (
        <button
            className="cta-button connect-wallet-button"
            onClick={onClick}
        >
            Connect to Wallet
        </button>
    )

}