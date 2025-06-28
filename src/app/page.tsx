import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">채이의 초대장</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <Link
            href="/anniversary-one-hundred"
            className="block p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-pink-200 hover:border-pink-300"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎂</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                백일 잔치
              </h2>
              <p className="text-gray-600">첫 백일을 축하합니다</p>
            </div>
          </Link>

          <Link
            href="/anniversary-one-year"
            className="block p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-blue-200 hover:border-blue-300"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                돌잔치
              </h2>
              <p className="text-gray-600">첫 번째 생일을 축하합니다</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
