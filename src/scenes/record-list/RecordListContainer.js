import React, { useState, useEffect } from 'react'
import {getRecords} from '../../services/api/generate'
import RecordDetail from './RecordDetail';

const RecordListContainer = () => {
    const [loading, setLoading] = useState(true)
    const [records, setRecords] = useState([])
    const [targetId, setTargetId] = useState(null)

    useEffect(() => {
        fetchRecords().then()
    }, [])

    useEffect(() => {
        if (records.length !== 0)
            setTargetId(records[0].index)
    }, [records])

    const fetchRecords = async () => {
        setLoading(true)
        const response = await getRecords()
        setLoading(false)
        console.log(response)
        if (!response)
            return 
        
        setRecords([...response.reverse()])
    }


    return <div className='w-full flex justify-between items-start overflow-hidden'>
        <div className='w-1/4 bg-white overflow-auto' style={{ height : '92vh'}}>
            {records.map(record => <div onClick={e => setTargetId(record.index)}className={`px-4 py-4 ${record.index === targetId ? 'bg-blue-500 text-white' : 'text-gray-700'} cursor-pointer flex flex-col justify-between items-start border-b-2 border-gray-300`}>
                <div className='font-bold'>{record.original_name}</div>
                <div className='text-sm mt-2'>{record.original_url}</div>
            </div>)}
        </div>
        <div className='w-3/4'>
            <RecordDetail targetId={targetId} />
        </div>
    </div>
}

export default RecordListContainer