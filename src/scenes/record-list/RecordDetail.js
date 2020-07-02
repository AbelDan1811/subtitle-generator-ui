import React, { useState, useEffect } from 'react'
import {getRecordDetail, editFile} from '../../services/api/generate'
import {useToasts} from 'react-toast-notifications'
const RecordDetail = ({ targetId }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const {addToast} = useToasts()
    useEffect(() => {
        if (targetId)
            fetchRecord().then()
    }, [targetId])

    const fetchRecord =  async () => {
        setLoading(true)
        const response = await getRecordDetail({ recordId : targetId })
        setLoading(false)

        if (!response)
            return

        setData({...response})
    }

    const handleEdit = (id) => (e) => {
        const nTrans = data.transcriptions.map((sub, index) => {
            if (index !== id) 
                return sub
            
            return {...sub, content : e.target.value}
        })

        setData({...data, transcriptions : [...nTrans]})
    }

    const getDownloadUrl = () => {
        return data ? `http://localhost:5000/subtitles/${data.id}/file` : null
    }

    const getEmbedUrl = (url) => {
        if (!url)
            return
        const videoId = url.match(/(?<=v\=).*/)
        return `https://www.youtube.com/embed/${videoId}`
    }

    const handleSave = async (e) => {
        setLoading(true)
        const response = await editFile({ id : data.id, data : data.transcriptions })
        setLoading(false)

        if (!response){
            console.log('err')
            return 
        }

        const {transcriptions} = {...response}
        setData({...data, transcriptions})
    }


    return <div className='w-full overflow-auto pb-6' style={{ height : '92vh'}}>
        <div className='p-6 flex justify-between items-center'>
            <div className='text-xl text-gray-700 font-bold w-3/4'>
                {data && data.original_name}
            </div>
            <div className='flex justify-end items-center w-1/4'>
                <a href={getDownloadUrl()} download className='w-1/2 text-center bg-red-500 hover:bg-red-600 font-bold rounded-lg text-white outline-none focus:outline-none px-4 py-2'>
                    <i className='fas fa-file-download mr-2'/> Download
                </a>
                <button onClick={handleSave} className='w-1/2 ml-2 bg-green-500 hover:bg-green-600 font-bold text-white rounded-lg outline-none focus:outline-none px-4 py-2'>
                    <i className='fas fa-check mr-2'/>Save
                </button>
            </div>
            
        </div>
        {data && 
            <div className='sticky top-0 bg-gray-300'>
                <hr className='border-t-2 border-gray-400 mb-6'/>
                <div className='w-full flex justify-center items-center'>
                    <iframe src={getEmbedUrl(data.original_url)} width={500} height={400} title='Video'/>
                </div>
                <hr className='border-t-2 border-gray-400 my-6'/>
            </div>
        }
        <div className='w-full mx-auto container bg-white'>
            <table className='mt-4 w-full border-2 border-gray-200'>
                <tr className='bg-gray-800 text-white'>    
                    <th className='w-1/12 py-4 px-2 text-center'>#</th>
                    <th className='w-1/8 py-4 px-2 text-left'>Start</th>
                    <th className='w-1/8 py-4 px-2 text-left'>End</th>
                    <th className='w-1/3 py-4 px-2 flex flex-wrap'>Content</th>
                </tr>
                {data && data.transcriptions.map((subtitle, id) => <tr> 
                    <td className='w-1/12 py-3 px-2 text-center'>{subtitle.index}</td> 
                    <td className='w-1/8 py-3 px-2'>{subtitle.start}</td>
                    <td className='w-1/8 py-3 px-2'>{subtitle.end}</td>
                    <td className='w-1/3 py-3 px-2'>
                        <input onChange={handleEdit(id)} className='h-full w-full outline-none border-none focus:outline-none focus:border-blue-400' value={subtitle.content} />
                    </td>
                </tr>)}
            </table>
        </div>
    </div>
}

export default RecordDetail