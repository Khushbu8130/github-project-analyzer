function Hero({ setRepoUrl }) {
  return (
    <div className="text-center mb-6">

      <h1 className="text-4xl font-bold tracking-tight">
        GitHub Project Analyzer 🚀
      </h1>

      <p className="text-gray-600 mt-3 max-w-2xl mx-auto leading-relaxed">
        Analyze GitHub repositories to detect fake projects, evaluate authenticity,
        and understand real development activity using AI-powered insights.
      </p>

      <p className="text-sm text-gray-500 mt-2">
        Try:
        <span
          className="text-blue-600 cursor-pointer ml-2 hover:underline"
          onClick={() =>
            setRepoUrl("https://github.com/facebook/react")
          }
        >
          facebook/react
        </span>
      </p>

    </div>
  );
}

export default Hero;