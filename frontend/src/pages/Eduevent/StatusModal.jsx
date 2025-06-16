// src/pages/competition/StatusModal.jsx (ini adalah file yang Anda berikan sebelumnya, pastikan sudah diupdate)
import React, { useState, useEffect } from "react";
import { History, FileSearch, CheckCircle, XCircle } from "lucide-react";

const steps = [
  { label: "Diproses", value: "diproses", icon: History },
  { label: "Seleksi berkas", value: "seleksi berkas", icon: FileSearch },
  { label: "Diterima", value: "diterima", icon: CheckCircle },
  { label: "Ditolak", value: "ditolak", icon: XCircle },
];

const StatusModal = ({ onClose, currentStatus }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Menemukan indeks langkah berdasarkan currentStatus dari BE
    const foundIndex = steps.findIndex(step => step.value === currentStatus);
    if (foundIndex !== -1) {
      setActiveStep(foundIndex);
    } else {
      setActiveStep(0); // Default ke 'Diproses' jika status tidak ditemukan
    }
  }, [currentStatus]); // Jalankan useEffect setiap kali currentStatus berubah

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lg font-bold"
        >
          &times;
        </button>

        <h3 className="text-xl font-bold text-center text-[#17355c] mb-6">
          Status Pendaftaran Kompetisi
        </h3>

        <div className="flex justify-between items-center px-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeStep; // Tandai langkah yang sudah dilewati/saat ini
            const isCompleted = index < activeStep; // Tandai langkah yang sudah selesai
            const isRejected = currentStatus === "ditolak" && index === steps.findIndex(s => s.value === "ditolak");

            return (
              <React.Fragment key={index}>
                <div
                  className={`flex flex-col items-center text-center ${
                    isActive ? "text-[#3375cc]" : "text-[#5e5a5a]"
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-1 ${isRejected && index === 3 ? "text-red-500" : ""}`} />
                  <span className="text-xs">{step.label}</span>
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      isRejected && index === 3
                        ? "bg-red-500"
                        : isActive
                        ? "bg-green-500"
                        : "bg-black"
                    }`}
                  ></div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 mt-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatusModal;