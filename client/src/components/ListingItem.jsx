import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full rounded-md sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          src={listing.imageURLs[0]}
          alt="image"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn size={16} className="text-green-700 truncate" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <div className=" flex text-slate-500 mt-2 font-semibold">
            {listing.offer ? (
              <div className="flex gap-2">
                <span className="text-slate-300 line-through">
                  ${listing.regularPrice.toLocaleString("en-US")}
                </span>
                <span className="text-red-500">
                  ${listing.discountPrice.toLocaleString("en-US")}
                </span>
              </div>
            ) : (
              listing.regularPrice.toLocaleString("en-US")
            )}
            <span className={listing.offer ? "text-red-500" : ""}>{listing.type === "rent" && "/month"}</span>
          </div>
          <div className="flex gap-4 text-slate-700">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.object,
};
