import { useEffect, useState } from "react";

interface GIFContainerProps {
    gifs: string[]
}

export const GIFContainer: React.FC<GIFContainerProps> = ({ gifs }) => {
    const [inputValue, setInputValue] = useState('');
    const [GIFList, setGIFList] = useState<string[]>([]);

    useEffect(() => {
        console.log('Fetching GIF list...');

        setGIFList(gifs);
    }, [gifs])

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInputValue(value);
    }

    const sendGIF = async () => {
        if (inputValue.length > 0) {
            console.log('GIF link:', inputValue);
            setGIFList([...GIFList, inputValue]);
            setInputValue('');
        } else {
            console.log('No GIF link provided');
        }
    }

    return (
        <div className='connected-container'>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    sendGIF();
                }}
            >
                <input type="text" placeholder="Enter gif link" value={inputValue} onChange={onInputChange}/>
                <button type="submit" className="cta-button submit-gif-button"> Submit </button>
            </form>
            <div className='gif-grid'>
                {GIFList.map(gif => (
                    <div className='gif-item' key={gif}>
                        <img src={gif} alt={gif} />
                    </div>
                ))}
            </div>
        </div>
    )
}