import Club from "../models/club.model.js";

// Fetch all clubs
export const fetchClubs = async () => {
  return await Club.find().populate("testimonials");
};

// Fetch a club by its clubId
export const fetchClubById = async (clubId) => {
  return await Club.findOne({ clubId }).populate("testimonials");
};

// Upsert a club: Update if exists, create if not
export const fetchUpsertClub = async (clubData) => {
  try {
    // console.log("Club Data", clubData);
    let club = await Club.findOne({ clubId: clubData.clubId });

    if (club) {
      // Update only fields that are not empty or undefined
      Object.keys(clubData).forEach((key) => {
        // Check if the value is not empty, not undefined, and not "NA"
        if (clubData[key] && clubData[key] !== "NA" && clubData[key] !== "") {
          club[key] = clubData[key];
        }
      });
      await club.save();
      return { message: "Club updated successfully", club };
    } else {
      // Create a new club
      club = new Club(clubData);
      await club.save();
      return { message: "Club created successfully", club };
    }
  } catch (err) {
    throw new Error("Error in upsertClub: " + err.message);
  }
};


export const addClubImages = async (clubId, imageUrls) => {
  try {
    const club = await Club.findOne({ clubId });

    if (!club) {
      throw new Error("Club not found");
    }

    // Append new image URLs to existing ones
    club.images = [...club.images, ...imageUrls];

    await club.save();
    return club;
  } catch (error) {
    throw new Error(error.message);
  }
};
