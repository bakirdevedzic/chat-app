function PageNotFound() {
  return (
    <div className="h-[calc(100dvh)] flex items-center flex-col overflow-auto">
      <section className="flex items-center h-screen p-16">
        <div className="container flex flex-col items-center ">
          <div className="flex flex-col gap-6 max-w-md text-center">
            <h2 className="font-extrabold text-9xl text-gray-600 ">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl md:text-3xl font-bold">
              Sorry, we couldn&apos;t find this page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageNotFound;
