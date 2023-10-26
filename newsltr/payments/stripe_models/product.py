from datetime import datetime
from typing import Dict, List, Union, Optional

from pydantic import BaseModel


class PackageDimension(BaseModel):
    height: float = None
    length: float = None
    weight: float = None
    width: float = None


class StripeProductFeature(BaseModel):
    name: Optional[str] = None


class StripeProduct(BaseModel):
    """A single StripeProduct, see https://stripe.com/docs/api/products/object"""
    id: Optional[str] = None
    active: Optional[bool] = None
    description: Optional[str] = None
    metadata: Optional[Dict] = None
    features: Optional[List[StripeProductFeature]] = None
    name: Optional[str] = None
    created: Optional[datetime] = None
    images: Optional[List[str]] = None
    package_dimensions: Optional[PackageDimension] = None
    shippable: Optional[bool] = None
    statement_descriptor: Optional[str] = None
    tax_code: Optional[Union[str, Dict]] = None
    unit_label: Optional[str] = None
    updated: Optional[datetime] = None
    url: Optional[str] = None


class StripeProducts(BaseModel):
    """List of StripeProducts"""
    url: str
    has_more: bool
    data: List[StripeProduct]


class StripeProductEventData(BaseModel):
    """Based on https://stripe.com/docs/api/products/object"""
    object: StripeProduct
    previous_attributes: Optional[StripeProduct] = None
