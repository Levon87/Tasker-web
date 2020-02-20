import { Component, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";

const ELEMENT_DATA: Element[] = [
	{
		position: 1,
		name: "Hydrogen",
		lastname: "dd",
		specialization: "back",
		role: "Admin"
	},
	{
		position: 2,
		name: "Helium",
		lastname: "fddddd",
		specialization: "back",
		role: "Operator"
	},
	{
		position: 3,
		name: "Lithium",
		lastname: "aaaaaaa",
		specialization: "front",
		role: "Admin"
	},
	{
		position: 4,
		name: "Beryllium",
		lastname: "dddddd",
		specialization: "back",
		role: "Admin"
	},
	{
		position: 5,
		name: "Boron",
		lastname: "ffffffff",
		specialization: "back",
		role: "Admin"
	},
	{
		position: 6,
		name: "Carbon",
		lastname: "dffffff",
		specialization: "back",
		role: "Operator"
	},
	{
		position: 7,
		name: "Nitrogen",
		lastname: "gggggg",
		specialization: "back",
		role: "Operator"
	},
	{
		position: 8,
		name: "Oxygen",
		lastname: "rrrrr",
		specialization: "back",
		role: "Operator"
	},
	{
		position: 9,
		name: "Fluorine",
		lastname: "bbbbbbb",
		specialization: "mobile",
		role: "Operator"
	},
	{
		position: 10,
		name: "Neon",
		lastname: "mmmmmmm",
		specialization: "front",
		role: "Operator"
	},
	{
		position: 11,
		name: "Sodium",
		lastname: "eeeeeeee",
		specialization: "front",
		role: "Operator"
	},
	{
		position: 12,
		name: "Magnesium",
		lastname: "wwwwwww",
		specialization: "back",
		role: "Operator"
	},
	{
		position: 13,
		name: "Aluminum",
		lastname: "wwwwwwwwwtty",
		specialization: "none",
		role: "Admin"
	},
	{
		position: 14,
		name: "Silicon",
		lastname: "fghhjjgffff",
		specialization: "front",
		role: "Operator"
	},
	{
		position: 15,
		name: "Phosphorus",
		lastname: "ssssssss",
		specialization: "back",
		role: "Admin"
	},
	{
		position: 16,
		name: "Sulfur",
		lastname: "wasdfghjk",
		specialization: "back",
		role: "Operator"
	},
	{
		position: 17,
		name: "Chlorine",
		lastname: "bnnnnnnn",
		specialization: "none",
		role: "Operator"
	},
	{
		position: 18,
		name: "Argon",
		lastname: "mmmmmmmm",
		specialization: "back",
		role: "Admin"
	},
	{
		position: 19,
		name: "Potassium",
		lastname: "bkflkdkk",
		specialization: "front",
		role: "Admin"
	},
	{
		position: 20,
		name: "Calcium",
		lastname: "erttuiii",
		specialization: "front",
		role: "Operator"
	}
];

/**
 * @title Table with pagination
 */
@Component({
	selector: "kt-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"]
})
export class UsersComponent {
	displayedColumns = [
		"position",
		"name",
		"lastName",
		"specialization",
		"role"
	];
	dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	/**
	 * Set the paginator after the view init since this component will
	 * be able to query its view for the initialized paginator.
	 */
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}
}

export interface Element {
	name: string;
	lastname: string;
	specialization: string;
	role: string;
	position: number;
}
