import PageNotFoundError from "../errors/Page-not-found.js";
import UnauthorizedError from "../errors/Unauthorized.js";
import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
  const listing = await Listing.create(req.body);
  return res.status(201).json(listing);
};

export const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new PageNotFoundError("Listing not found");

  if (req.user.id !== listing.userRef)
    throw new UnauthorizedError("You can only delete your own listing");

  await Listing.findByIdAndDelete(req.params.id);
  return res.status(201).json("Delete successfully");
};

export const updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) throw new PageNotFoundError("Listing not found");
  if (req.user.id !== listing.userRef)
    throw new UnauthorizedError("You can only update your own listing");

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  )
  res.status(200).json(updatedListing)
};
