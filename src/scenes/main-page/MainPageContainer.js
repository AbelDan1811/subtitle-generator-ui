import React, { useState, useEffect } from 'react'
import {requestGenerate, editFile} from '../../services/api/generate'
import {useToasts} from 'react-toast-notifications'

const MainPageContainer = () => {
    const [videoUrl, setVideoUrl] = useState('')
    const [clickedGenerate, setClickedGenerate] = useState(false)
    const [embedUrl, setEmbedUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)
    const [id, setId] = useState(null)
    const [submitable, setSubmitable] = useState(false)

    const {addToast} = useToasts()

    useEffect(() => {
        setError(false)
        if (clickedGenerate && videoUrl.indexOf('https://www.youtube.com/watch?v=') !== -1){
            const eUrl = getEmbedUrl(videoUrl)
            setEmbedUrl(eUrl)
        } else {
            setEmbedUrl(null)
        } 
    }, [clickedGenerate])

    

    useEffect(()=> {
        setClickedGenerate(false)
        if (videoUrl && videoUrl.indexOf('https://www.youtube.com/watch?v=') !== -1 ) {
            setSubmitable(true)
        }
        else setSubmitable(false)
    }, [videoUrl])

    const handleGenerate = async (e) => {
        setClickedGenerate(true)
        setLoading(true)
        const response = await requestGenerate({ videoUrl })
        setLoading(false)
        if (!response){
            setError(true)
            return 
        }
        addToast('The subtitle has been successfully generated.', { appearance : 'success'})
        const {transcriptions, id : subId} = {...response} 
        setData([...transcriptions])
        setId(subId)
    }

    const getDownloadUrl = () => {
        return `http://localhost:5000/subtitles/${id}/file`
    }

    const handleChange = (id) => (e) => {
        const nData = data.map((sub, index) => {
            if (index !== id) 
                return sub
            
            return {...sub, content : e.target.value}
        })

        setData([...nData])
    }

    const getEmbedUrl = (url) => {
        const videoId = url.match(/(?<=v\=).*/)
        return `https://www.youtube.com/embed/${videoId}`
    }

    const handleSave = async (e) => {
        setLoading(true)
        const response = await editFile({ id, data })
        setLoading(false)

        if (!response){
            console.log('err')
            return 
        }

        addToast('The subtitle has been successfully generated.', { appearance : 'success'})

        const {transcriptions} = {...response}
        setData([...transcriptions])
    }


    return <div className='mx-auto container bg-white w-full px-24 py-12' style={{ minHeight: '100vh'}}>
        <div className='w-full'>
            <div className='text-gray-700 font-black text-lg uppercase'>Paste your video URL here:</div>
            <textarea rows={4}
                className='mt-4 w-full border-4 rounded-lg text-gray-700 py-3 px-4 border-blue-400 focus:border-green-400 outline-none focus:outline-none'
                value={videoUrl}   
                onChange={ e => setVideoUrl(e.target.value)} 
            />
            <div className='flex justify-center items-center mt-4'>
                <button disabled={!submitable} onClick={handleGenerate} className={`${submitable ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 cursor-default ' } px-16 text-xl py-4 text-white font-bold rounded-lg outline-none focus:outline-none`}>
                    { loading ? <i className='fas fa-spinner loading' /> : 'GENERATE'}
                </button>
            </div>
        </div>
        {embedUrl && 
            <div className='sticky top-0 bg-white'>
            <hr className='border-t-2 border-gray-300 my-6'/>
            <div className='w-full flex justify-center items-center'>
                <iframe src={embedUrl} width={500} height={400} title='Video'/>
            </div>
            <hr className='border-t-2 border-gray-300 my-6'/>
            </div>
        }
        
        {data && 
        <>
            <div className='flex justify-end items-center mt-6'>
                <a href={getDownloadUrl()} download className='w-1/8 bg-red-500 hover:bg-red-600 font-bold rounded-lg text-white outline-none focus:outline-none px-4 py-2'>
                    <i className='fas fa-file-download mr-2'/> Download
                </a>
                <button onClick={handleSave} className='w-1/8 ml-2 bg-green-500 hover:bg-green-600 font-bold text-white rounded-lg outline-none focus:outline-none px-4 py-2'>
                    <i className='fas fa-check mr-2'/>Save
                </button>

                {/* <a href={getDownloadUrl()} download={''}></a> */}
            </div>
            <table className='mt-4 w-full border-2 border-gray-200'>
                <tr className='bg-gray-800 text-white'>    
                    <th className='w-1/12 py-4 px-2 text-center'>#</th>
                    <th className='w-1/8 py-4 px-2 text-left'>Start</th>
                    <th className='w-1/8 py-4 px-2 text-left'>End</th>
                    <th className='w-1/3 py-4 px-2 flex flex-wrap'>Content</th>
                </tr>
                {data.map((subtitle, id) => <tr> 
                    <td className='w-1/12 py-3 px-2 text-center'>{subtitle.index}</td> 
                    <td className='w-1/8 py-3 px-2'>{subtitle.start}</td>
                    <td className='w-1/8 py-3 px-2'>{subtitle.end}</td>
                    <td className='w-1/3 py-3 px-2'>
                        <input onChange={handleChange(id)} className='h-full w-full outline-none border-none focus:outline-none focus:border-blue-400 focus:border-4' value={subtitle.content} />
                    </td>
                </tr>)}
            </table>
        </>
        }
    </div>
}

export default MainPageContainer