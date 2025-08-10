import { useEffect, useState } from "react"

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      try {
        const response = await fetch(url, options)
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setData(responseData)
        setError()
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }

    }

    fetchData()
  }, dependencies)


  return { data, loading, error }
}