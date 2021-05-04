import FormData from 'form-data';
import { Platform } from 'react-native';
import axios from 'axios';
import config from '../../config';

const createFormData = (photo, body) => {
    const data = new FormData();
    data.append('file', {
        name: photo.filename,
        uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};

export default class S3Api {
    static store(token, photo, body, callback) {
        const formData = createFormData(photo, body);
        return axios
            .post(`${config.url}/api/photo/photos`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${token}`,
                },
                onUploadProgress: callback,
            })
            .catch(error => {
                throw error;
            });
    }
}