'use client'
const LoadingSpin = () => <div className="flex justify-center">
              <div className="flex flex-col">
                <img src="/loading-icon.png" alt="icon-loading" className="animate-spin w-10 h-10 flex mx-auto" />
                <span className="text-gray-800 text-center animate-pulse">Loading...</span>
              </div>
            </div>

export default LoadingSpin