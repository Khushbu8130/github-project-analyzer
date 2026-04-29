function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
      <div className="bg-white p-5 rounded-xl shadow text-center">
        <h3 className="font-semibold">Authenticity Detection</h3>
        <p className="text-sm text-gray-500 mt-1">
          Identify fake or copied projects instantly
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow text-center">
        <h3 className="font-semibold">AI Insights</h3>
        <p className="text-sm text-gray-500 mt-1">
          Understand project quality and depth
        </p>
      </div>

      <div className="bg-white p-5 rounded-xl shadow text-center">
        <h3 className="font-semibold">Visual Analytics</h3>
        <p className="text-sm text-gray-500 mt-1">
          Commit trends and activity graphs
        </p>
      </div>
    </div>
  );
}

export default FeatureCards;