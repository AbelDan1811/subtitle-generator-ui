import {createRequest} from './index'
import { async } from 'q';

export const requestGenerate = async ({ videoUrl }) => {
    return await createRequest({
        url : '/generate',
        method : 'POST',
        data : {
            video_url : videoUrl
        }
    })
}

export const editFile = async ({ id, data}) => {
    return await createRequest({
        url : `/subtitles/${id}/edit`,
        method : 'POST',
        data : data
    })
}

export const getRecords = async () => {
    return await createRequest({
        url : `/subtitles`,
        method : 'GET'
    })
}

export const getRecordDetail = async ({ recordId }) => {
    return await createRequest({
        url : `/subtitles/${recordId}`
    })
}