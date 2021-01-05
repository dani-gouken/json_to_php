import { describe, expect, test } from "@jest/globals";
import convert from "../src/convert";
import { Visibility } from "../src/property";
import * as stub from "./stub";
describe("convert",() =>{
    test("it convert with one property",() => {
        expect(convert(
            `{"foo":"bar"}`
        )).toEqual(stub.classWithOneProperty);
    });

    test("it convert with class name",() => {
        expect(convert(
            `{"foo":"bar"}`,{
                className: "FOO"
            }
        )).toEqual(stub.classWithClassName);
    });

    test("it convert with many properties",() => {
        expect(convert(
            `{"foo":"bar","bar":"baz", "jhon":"doe"}`
        )).toEqual(stub.classWithManyProperties);
    });

    test("it convert with visibility",() => {
        expect(convert(
            `{"foo":"bar","bar":"baz", "jhon":"doe"}`,{
                visibility: Visibility.PROTECTED
            }
        )).toEqual(stub.classWithManyPropertiesAndProtectedVisibility);
    });

    test("it convert properties name to camel case",() => {
        expect(convert(
            `{"camel_case":"bar"}`,{
                visibility: Visibility.PROTECTED
            }
        )).toEqual(stub.classWithCamelCase);
    });
    test("it adds typed properties",() => {
        expect(convert(
            `{"boolean":true,"string":"string","float":10.1,"int":42,"array":["foo","bar"],"my_Object":{"foo":"bar"}}`,{
                visibility: Visibility.PRIVATE,
                className: "Typed",
                typedProperties:true
            }
        )).toEqual(stub.classWithTypedProperties);
    });
    test("it adds namespace",() => {
        expect(convert(
            `{"boolean":true,"string":"string"}`,{
                className: "Namespaced",
                typedProperties:true,
                namespace: "App\\Foo"
            }
        )).toEqual(stub.classWithNamespace);
    });
});
