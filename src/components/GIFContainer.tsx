interface GIFContainerProps {
    gifs: string[]
}

export const GIFContainer: React.FC<GIFContainerProps> = ({ gifs }) => {
    return (
        <div className='connected-container'>
            <div className='gif-grid'>
                {gifs.map(gif => (
                    <div className='gif-item' key={gif}>
                        <img src={gif} alt={gif} />
                    </div>
                ))}
            </div>
        </div>
    )
}