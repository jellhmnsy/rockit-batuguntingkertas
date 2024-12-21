import {useState} from 'react';

export default function BelajarState() {
    const [count, setCount] = useState(0);
    const [nama, setNama] = useState("Andika");
    const [count2, setCount2] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    function gantiNama() {
        setCount2(count2 + 1);
        if (count2 % 2 === 0) {
            setNama("Andika Putra");
        } else {
            setNama("Andika");
        }
    }

    return (
        <>
        <button onClick={handleClick}>Clicked {count} times</button>
        <br />
        <button onClick={gantiNama}>Halo nama saya {nama}</button>
        </>
    );
}