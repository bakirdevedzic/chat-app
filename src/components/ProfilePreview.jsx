function ProfilePreview() {
  return (
    <div>
      <div className="flex justify-center items-center w-40 h-40 rounded-full bg-white">
        <div className="text-center font-bold text-xl">Bujange Bapak</div>
        <button className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full">
          My Account
        </button>
      </div>
    </div>
  );
}

export default ProfilePreview;
