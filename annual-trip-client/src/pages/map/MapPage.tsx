import { useEffect, useMemo, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { getTeacherMap } from "../../api/locationsApi";
import type { TeacherMapResponse } from "../../types/map.types";
import BackButton from "../../components/common/BackButton";
import { socket } from "../../socket";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

function calculateDistanceKm(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
) {
  const R = 6371;

  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;

  const lat1 = (point1.lat * Math.PI) / 180;
  const lat2 = (point2.lat * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) *
      Math.sin(dLng / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function MapPage() {
  const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [mapData, setMapData] = useState<TeacherMapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [initialCenter, setInitialCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: googleMapApiKey,
  });

  useEffect(() => {
    async function loadMapData() {
      try {
        setMessage("");

        const data = await getTeacherMap();
        console.log("map data from server:", data);

        setMapData(data);

        socket.connect();

        if (data.teacher.classname) {
          socket.emit("join-class-room", data.teacher.classname);
          console.log("joined class room:", data.teacher.classname);
        }
      } catch (error) {
        console.error("Failed to load map data:", error);
        setMessage("שגיאה בטעינת נתוני המפה");
      } finally {
        setLoading(false);
      }
    }

    loadMapData();

    socket.on("student-location-updated", (updatedLocation) => {
      console.log("student location from socket:", updatedLocation);

      setMapData((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          students: prev.students.map((student) =>
            student.id.trim() === String(updatedLocation.studentid).trim()
              ? {
                  ...student,
                  longitude: updatedLocation.longitude,
                  latitude: updatedLocation.latitude,
                  locationtime: updatedLocation.locationtime,
                }
              : student
          ),
        };
      });
    });

    socket.on("teacher-location-updated", (updatedLocation) => {
      console.log("teacher location from socket:", updatedLocation);

      setMapData((prev) => {
        if (!prev) {
          return prev;
        }

        if (prev.teacher.id.trim() !== String(updatedLocation.teacherid).trim()) {
          return prev;
        }

        return {
          ...prev,
          teacher: {
            ...prev.teacher,
            location: {
              teacherid: updatedLocation.teacherid,
              longitude: updatedLocation.longitude,
              latitude: updatedLocation.latitude,
              locationtime: updatedLocation.locationtime,
            },
          },
        };
      });
    });

    return () => {
      socket.off("student-location-updated");
      socket.off("teacher-location-updated");
      socket.disconnect();
    };
  }, []);

  const teacherPosition = useMemo(() => {
    if (!mapData?.teacher.location) {
      return null;
    }

    const lat = Number(mapData.teacher.location.latitude);
    const lng = Number(mapData.teacher.location.longitude);

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return null;
    }

    console.log("teacher position for map:", {
      lat,
      lng,
    });

    return {
      lat,
      lng,
    };
  }, [mapData]);

  useEffect(() => {
    if (!initialCenter && teacherPosition) {
      setInitialCenter(teacherPosition);
    }
  }, [initialCenter, teacherPosition]);

  const studentsForMap = useMemo(() => {
    if (!mapData || !teacherPosition) {
      return [];
    }

    return mapData.students
      .filter(
        (student) =>
          student.latitude !== null &&
          student.longitude !== null &&
          !Number.isNaN(Number(student.latitude)) &&
          !Number.isNaN(Number(student.longitude))
      )
      .map((student) => {
        const studentPosition = {
          lat: Number(student.latitude),
          lng: Number(student.longitude),
        };

        const distanceKm = calculateDistanceKm(teacherPosition, studentPosition);

        return {
          ...student,
          position: studentPosition,
          distanceKm,
          isFar: distanceKm > 3,
        };
      });
  }, [mapData, teacherPosition]);

  const farStudents = studentsForMap.filter((student) => student.isFar);

  const mapCenter = initialCenter ?? {
    lat: 32.1013,
    lng: 34.8119,
  };

  if (loading) {
    return <p>טוען נתוני מפה...</p>;
  }

  if (message) {
    return <p>{message}</p>;
  }

  if (!mapData) {
    return <p>לא נמצאו נתונים להצגה</p>;
  }

  if (loadError) {
    return <p>שגיאה בטעינת Google Maps</p>;
  }

  if (!isLoaded) {
    return <p>טוען Google Maps...</p>;
  }

  return (
    <div>
      <BackButton />

      <h2>מפת מיקומים</h2>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={15}
      >
        {teacherPosition && (
          <Marker
            position={teacherPosition}
            label="מורה"
            title={`${mapData.teacher.firstname} ${mapData.teacher.lastname}`}
          />
        )}

        {studentsForMap.map((student) => (
          <Marker
            key={student.id.trim()}
            position={student.position}
            label={student.firstname}
            title={
              student.isFar
                ? `${student.firstname} ${student.lastname} - רחוקה מהמורה (${student.distanceKm.toFixed(
                    2
                  )} ק"מ)`
                : `${student.firstname} ${student.lastname} - תקינה (${student.distanceKm.toFixed(
                    2
                  )} ק"מ)`
            }
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: student.isFar ? "#d93025" : "#188038",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
              scale: 9,
            }}
          />
        ))}
      </GoogleMap>

      {farStudents.length > 0 && (
        <div style={{ marginTop: "16px", color: "#d93025" }}>
          <h3>אזהרות</h3>

          <ul>
            {farStudents.map((student) => (
              <li key={student.id.trim()}>
                {student.firstname} {student.lastname} רחוקה מהמורה —{" "}
                {student.distanceKm.toFixed(2)} ק"מ
              </li>
            ))}
          </ul>
        </div>
      )}

      {studentsForMap.length > 0 && farStudents.length === 0 && (
        <p style={{ marginTop: "16px", color: "#188038" }}>
          כל התלמידות נמצאות בטווח תקין מהמורה
        </p>
      )}
    </div>
  );
}

export default MapPage;