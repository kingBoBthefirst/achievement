import x from "./Card.module.css";

export default function Card(){
    console.log(x)
    return <>
    <div className={`${x.card} w-72 m-3 shadow-xl rounded-lg overflow-hidden`}>
        <img className="w-full" src="https://plus.unsplash.com/premium_photo-1664304752635-3e0d8d8185e3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D" alt=""/>
        <div className='card-body p-3  space-y-2'>
            <div className="card-header" >
                <h2 className="text-2xl font-semibold text-gray-500">title</h2>
                <h3 className="text-sm text-gray-400">Category</h3>

            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At porro dolore et nesciunt atque explicabo voluptatum deserunt eaque dolores recusandae! Velit distinctio provident consectetur, illo quasi soluta id laudantium voluptatum!</p>
            <button className="btn ">Delete Card</button>
        </div>

    </div>
    </>

}