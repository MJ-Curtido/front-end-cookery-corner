import { useState, useEffect } from 'react';

const store = (store, callback) => {
    const result = store(callback);
    const [data, setData] = useState();

    useEffect(() => {
        setData(result);
    }, [result]);

    return data;
};

export default store;
