export default function TestStyling() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm">
          <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
            <h1 className="text-3xl font-bold">🎨 CSS & Tailwind Test</h1>
            <p className="text-blue-100 text-sm mt-2">
              Testing all styling components after fixes
            </p>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Basic Styling</h2>
                <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <p className="text-blue-800 font-semibold">✅ Blue styled box</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                  <p className="text-green-800 font-semibold">✅ Green styled box</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                  <p className="text-red-800 font-semibold">✅ Red styled box</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Interactive Elements</h2>
                <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]">
                  Gradient Button
                </button>
                <button className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">
                  Solid Button
                </button>
                <input 
                  type="text" 
                  placeholder="Test input field"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Status Check</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>✅ PostCSS Config: Created</div>
                <div>✅ CSS Variables: Fixed</div>
                <div>✅ Tailwind Plugins: Installed</div>
                <div>✅ Docker Volumes: Optimized</div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                If you can see all the styling above, Tailwind CSS is working perfectly! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
