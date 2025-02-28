import Link from "next/link";

export default function ActionButtons({ isAuthenticated, contact_details }) {
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center w-full mb-3 mt-1">
        <span
          className="text-2xl font-extrabold text-yellow-100"
          style={{
            textShadow:
              "0 0 3px #fff, 0 0 5px #ff00de, 0 0 8px #ff00de",
          }}
        >
          Live Matka Result
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-full sm:max-w-md mx-auto">
      <div className="bg-purple-800 border border-white rounded-lg shadow-md p-4">
  <div className="flex lg:flex-nowrap justify-between lg:justify-between items-center gap-4">
    {/* Add Money */}
    <Link href="/add-fund">
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow">
          <img src="/money.png" alt="Add Money" className="w-10 h-10" />
        </div>
        <span className="text-white text-sm font-semibold">
          Add
        </span>
      </div>
    </Link>

    {/* WhatsApp */}
    <Link href={contact_details || "#"}>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow">
          <img src="/whatsapp.png" alt="WhatsApp" className="w-13 h-12" />
        </div>
        <span className="text-white text-sm font-semibold">
          WhatsApp
        </span>
      </div>
    </Link>

    {/* Withdrawal */}
    <Link href="/withdraw">
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow">
          <img
            src="/withdraw.png"
            alt="Withdrawal"
            className="w-10 h-10"
          />
        </div>
        <span className="text-white text-sm font-semibold">
          Withdrawal
        </span>
      </div>
    </Link>
  </div>
</div>
    </div>
  );
}
