const HeroComponent = () => {
    return (
        <div className="section1 px-24 py-12 flex justify-between">
        <div className="greeting text-left">
        <p className="font-bold text-6xl mb-4">Good Morning, Chelsea</p>
        <p className="font-normal text-2xl ml-2">Check all your incoming and outgoing transaction here</p>
        </div>
        <div className="profile flex items-center">
        <div className="text-right">
            <p className="font-bold text-base">Chelsea Island</p>
            <p className="font-normal text-base">Personal Account</p>
        </div>
        <div className="">
            <img className="rounded-full border-8 border-teal-400 ml-6" src="https://picsum.photos/64/64" alt="" />
        </div>
        </div>
        </div>        
    )
}

export default HeroComponent;
