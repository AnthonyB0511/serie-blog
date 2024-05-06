import { useEffect, useState } from "react";

export function useFetchData(url, way) {
    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchDatas() {
            try {
                const response = await fetch(`${url}/${way}`);
                if (response.ok) {
                    const datasBack = await response.json();
                    const modifiedDatasBack = datasBack.map((s) =>
                        s.liked === 1 ? { ...s, like: true } : { ...s, liked: false });
                    // setDatas(modifiedDatasBack);
                    const newModifiedDatas = await Promise.all(
                        modifiedDatasBack.map(async (s) => {
                            if (s.image === null) {
                                const response = await fetch(URL.createObjectURL(new Blob([new Uint8Array(s.imgBlob.data)])
                                ));
                                const text = await response.text();
                                s.image = text;
                            }
                            return { ...s };
                        })
                    );
                    setDatas(newModifiedDatas);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDatas();
    }, [url]);
    return [[datas, setDatas], isLoading];

}
