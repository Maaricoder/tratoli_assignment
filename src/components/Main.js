import React from 'react'
import img from "../components/profile.png"
import { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from './Loader';

function Main() {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();

// const [obj, setobj] = useState();

    const pokeFun = async () => {
        setLoading(true)
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results)
        setLoading(false)
    }
    const getPokemon = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url)
            console.log("result data",result.data)
           

        

            
            setPokeData(state => {
                state = [...state,result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)

                console.log("state",state)

                return state;
            })
        })
    }
    useEffect(() => {
        pokeFun();
    }, [url])

    console.log(pokeData)

    return (
        <>

            <div className='container-fluid'>
                <div className='row'>
                    <div  className='col-sm-12 col-md-6 col-lg-6 bg-primaray '>

                        <div className='row gx-5 gy-5'>

                            {
                                loading ? <Loader></Loader>
                                    : pokeData.map((item) => {
                                        return <div className='col-sm-12 col-md-12 col-lg-6  gx-5 cursor-pointer border border-2 ' onClick={() => setPokeDex(item)} >
                                            <div className='flex p-3 justify-around items-center'>
                                                <h1 className='heading'>{item.id}</h1>
                                                <img className='h-14' src={item.sprites.front_default}></img>
                                                <h1 className='heading text-lg font-semibold'>{item.name}</h1>
                                            </div>

                                        </div>

                                    })
                            }



                        </div>


                        <div className='text-center fixed bottom-0 left-[220px]'>
                            {prevUrl && <button onClick={() => {
                                setPokeData([])
                                setUrl(prevUrl)
                            }} className='btn btn-primary ml-2  ' >Pre </button>
                            }
                            {nextUrl && <button onClick={() => {
                                setPokeData([])
                                setUrl(nextUrl)
                            }} className='btn btn-primary ml-2 ' >Next </button>}
                        </div>

                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 mt-20 flex justify-center relative '>
                        <div className='text-center fixed top-10'>

                            {
                                (!pokeDex) ? <h1 className="text-lg">Lets Click The Power </h1> : (
                                    <>
                                        <h1 className='text-center text-3xl py-5'>{pokeDex.name}</h1>
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeDex.id}.svg`} alt="" />
                                        {
                                            pokeDex.stats.map(poke => {
                                                return <h3 className='text-lg'>{poke.stat.name}:{poke.base_stat}</h3>
                                            })
                                        }
                                    </>
                                )

                            }

                            {/* <h1 className='text-center text-3xl py-5'>hello lfjlksfasdf</h1> */}
                            {/* <img src='https://i.stack.imgur.com/ATGIX.png' alt='pic' className='h-40 text-center'></img>
                            <h1 className='text-center'>hello lfjlksfasdf</h1>
                            <h1 className='text-center'>hello lfjlksfasdf</h1>
                            <h1 className='text-center'>hello lfjlksfasdf</h1> */}

                        </div>



                    </div>
                </div>
            </div>



        </>
    )
}

export default Main
